
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create test user (required for testing)
  const hashedPassword = await bcrypt.hash('johndoe123', 10)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      password: hashedPassword,
      weight: 70,
      age: 30,
      height: 175,
      activityLevel: 'moderate',
    },
  })

  // Create a daily goal for today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.dailyGoal.upsert({
    where: {
      userId_date: {
        userId: testUser.id,
        date: today,
      }
    },
    update: {},
    create: {
      userId: testUser.id,
      date: today,
      goalMl: 2400,
      type: 'automatic',
    },
  })

  // Add some sample water intake data for today
  const sampleIntakes = [
    { amount: 250, notes: 'Café da manhã' },
    { amount: 500, notes: 'Antes do almoço' },
    { amount: 300, notes: 'Lanche da tarde' },
  ]

  for (const intake of sampleIntakes) {
    await prisma.waterIntake.create({
      data: {
        userId: testUser.id,
        amount: intake.amount,
        notes: intake.notes,
        source: 'manual',
        timestamp: new Date(),
      },
    })
  }

  // Add some sample urine records for today
  const sampleUrineRecords = [
    { frequency: 1, volume: 250, notes: 'Manhã' },
    { frequency: 1, volume: 300, notes: 'Meio-dia' },
    { frequency: 1, volume: 200, notes: 'Tarde' },
  ]

  for (const record of sampleUrineRecords) {
    await prisma.urineRecord.create({
      data: {
        userId: testUser.id,
        frequency: record.frequency,
        volume: record.volume,
        notes: record.notes,
        source: 'manual',
        timestamp: new Date(),
      },
    })
  }

  console.log('✅ Database seeding completed!')
  console.log(`Test user created: ${testUser.email}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
