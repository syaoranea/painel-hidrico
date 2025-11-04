
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { id } = params

    // Verify the record belongs to the user
    const urineRecord = await prisma.urineRecord.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!urineRecord) {
      return NextResponse.json(
        { message: 'Registro não encontrado' },
        { status: 404 }
      )
    }

    await prisma.urineRecord.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Registro excluído com sucesso' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete urine record error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
