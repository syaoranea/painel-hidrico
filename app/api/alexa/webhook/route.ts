
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { AlexaRequest, AlexaResponse } from '@/lib/types'

export const dynamic = 'force-dynamic'

// Helper function to create Alexa response
function createAlexaResponse(speechText: string, shouldEndSession: boolean = true): AlexaResponse {
  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: speechText,
      },
      shouldEndSession,
    },
  }
}

// Helper function to get user by Alexa user ID (you'll need to implement account linking)
async function getUserByAlexaId(alexaUserId: string) {
  // For now, we'll use a simple mapping. In production, you'd implement proper account linking
  // This is a simplified version - in reality, you'd store the Alexa user ID in the user record
  const user = await prisma.user.findFirst({
    where: {
      email: 'john@doe.com', // Default test user for demonstration
    },
  })
  
  return user
}

export async function POST(request: Request) {
  try {
    const alexaRequest: AlexaRequest = await request.json()
    
    // Verify the request is from Amazon Alexa (simplified)
    const skillId = process.env.ALEXA_SKILL_ID
    if (!skillId) {
      return NextResponse.json(
        createAlexaResponse('Erro de configuração do skill.'),
        { status: 400 }
      )
    }

    const requestType = alexaRequest.request.type
    const alexaUserId = alexaRequest.session.user.userId

    // Handle different request types
    switch (requestType) {
      case 'LaunchRequest':
        return NextResponse.json(
          createAlexaResponse('Bem-vindo ao Controle Hídrico! Você pode dizer: registrar água, registrar eliminação, ou verificar progresso.', false)
        )

      case 'IntentRequest':
        const intentName = alexaRequest.request.intent?.name
        
        switch (intentName) {
          case 'RegisterWaterIntent':
            return await handleWaterRegistration(alexaRequest, alexaUserId)
          
          case 'RegisterUrineIntent':
            return await handleUrineRegistration(alexaRequest, alexaUserId)
          
          case 'CheckProgressIntent':
            return await handleProgressCheck(alexaUserId)
          
          case 'AMAZON.HelpIntent':
            return NextResponse.json(
              createAlexaResponse('Você pode dizer: registrar 250 mililitros de água, registrar eliminação, ou verificar meu progresso.', false)
            )
          
          case 'AMAZON.StopIntent':
          case 'AMAZON.CancelIntent':
            return NextResponse.json(
              createAlexaResponse('Até logo! Continue se hidratando!')
            )
          
          default:
            return NextResponse.json(
              createAlexaResponse('Desculpe, não entendi. Tente dizer: registrar água ou verificar progresso.')
            )
        }

      case 'SessionEndedRequest':
        return NextResponse.json(
          createAlexaResponse('Tchau!')
        )

      default:
        return NextResponse.json(
          createAlexaResponse('Tipo de requisição não reconhecido.')
        )
    }

  } catch (error) {
    console.error('Alexa webhook error:', error)
    return NextResponse.json(
      createAlexaResponse('Desculpe, ocorreu um erro. Tente novamente mais tarde.'),
      { status: 500 }
    )
  }
}

async function handleWaterRegistration(request: AlexaRequest, alexaUserId: string) {
  try {
    const user = await getUserByAlexaId(alexaUserId)
    
    if (!user) {
      return NextResponse.json(
        createAlexaResponse('Você precisa vincular sua conta no aplicativo primeiro.')
      )
    }

    // Extract amount from the slot
    const amountSlot = request.request.intent?.slots?.amount?.value
    const amount = amountSlot ? parseInt(amountSlot) : 250 // Default to 250ml

    if (amount <= 0 || amount > 10000) {
      return NextResponse.json(
        createAlexaResponse('Por favor, informe uma quantidade entre 1 e 10 mil mililitros.')
      )
    }

    // Register the water intake
    await prisma.waterIntake.create({
      data: {
        userId: user.id,
        amount,
        source: 'alexa',
        notes: 'Registrado via Alexa',
      },
    })

    return NextResponse.json(
      createAlexaResponse(`Perfeito! Registrei ${amount} mililitros de água. Continue se hidratando!`)
    )

  } catch (error) {
    console.error('Water registration error:', error)
    return NextResponse.json(
      createAlexaResponse('Não consegui registrar a água. Tente novamente.')
    )
  }
}

async function handleUrineRegistration(request: AlexaRequest, alexaUserId: string) {
  try {
    const user = await getUserByAlexaId(alexaUserId)
    
    if (!user) {
      return NextResponse.json(
        createAlexaResponse('Você precisa vincular sua conta no aplicativo primeiro.')
      )
    }

    // Extract frequency from the slot (default to 1)
    const frequencySlot = request.request.intent?.slots?.frequency?.value
    const frequency = frequencySlot ? parseInt(frequencySlot) : 1

    if (frequency <= 0 || frequency > 50) {
      return NextResponse.json(
        createAlexaResponse('Por favor, informe uma frequência entre 1 e 50 vezes.')
      )
    }

    // Register the urine record
    await prisma.urineRecord.create({
      data: {
        userId: user.id,
        frequency,
        source: 'alexa',
        notes: 'Registrado via Alexa',
      },
    })

    const timesText = frequency === 1 ? 'vez' : 'vezes'
    return NextResponse.json(
      createAlexaResponse(`Certo! Registrei a eliminação ${frequency} ${timesText}. Obrigado pelo registro!`)
    )

  } catch (error) {
    console.error('Urine registration error:', error)
    return NextResponse.json(
      createAlexaResponse('Não consegui registrar a eliminação. Tente novamente.')
    )
  }
}

async function handleProgressCheck(alexaUserId: string) {
  try {
    const user = await getUserByAlexaId(alexaUserId)
    
    if (!user) {
      return NextResponse.json(
        createAlexaResponse('Você precisa vincular sua conta no aplicativo primeiro.')
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Get today's water intake
    const waterIntakes = await prisma.waterIntake.findMany({
      where: {
        userId: user.id,
        timestamp: {
          gte: today,
          lt: tomorrow,
        }
      }
    })

    const todayWater = waterIntakes?.reduce((total, intake) => total + intake.amount, 0) || 0

    // Get daily goal
    const goal = await prisma.dailyGoal.findFirst({
      where: {
        userId: user.id,
        date: today,
      }
    })

    const dailyGoal = goal?.goalMl || 2000
    const progress = dailyGoal > 0 ? Math.round((todayWater / dailyGoal) * 100) : 0
    const remaining = Math.max(dailyGoal - todayWater, 0)

    let responseText = `Hoje você consumiu ${todayWater} mililitros de água. `
    
    if (progress >= 100) {
      responseText += `Parabéns! Você atingiu ${progress}% da sua meta diária!`
    } else {
      responseText += `Isso representa ${progress}% da sua meta de ${dailyGoal} mililitros. `
      responseText += `Faltam ${remaining} mililitros para atingir sua meta. Continue se hidratando!`
    }

    return NextResponse.json(
      createAlexaResponse(responseText)
    )

  } catch (error) {
    console.error('Progress check error:', error)
    return NextResponse.json(
      createAlexaResponse('Não consegui verificar seu progresso. Tente novamente.')
    )
  }
}
