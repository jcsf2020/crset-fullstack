import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed da base de dados...')

  // Criar utilizador de exemplo
  const user = await prisma.user.upsert({
    where: { email: 'demo@financeflow.com' },
    update: {},
    create: {
      email: 'demo@financeflow.com',
      name: 'Utilizador Demo',
      image: null,
    },
  })

  console.log('👤 Utilizador criado:', user.email)

  // Criar categorias
  const categories = [
    { name: 'Alimentação', color: '#EF4444', icon: '🍽️' },
    { name: 'Transporte', color: '#3B82F6', icon: '🚗' },
    { name: 'Habitação', color: '#10B981', icon: '🏠' },
    { name: 'Saúde', color: '#F59E0B', icon: '🏥' },
    { name: 'Entretenimento', color: '#8B5CF6', icon: '🎬' },
    { name: 'Educação', color: '#06B6D4', icon: '📚' },
    { name: 'Salário', color: '#22C55E', icon: '💰' },
    { name: 'Investimentos', color: '#6366F1', icon: '📈' },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { 
        name_userId: {
          name: category.name,
          userId: user.id
        }
      },
      update: {},
      create: {
        ...category,
        userId: user.id,
      },
    })
    createdCategories.push(created)
  }

  console.log('📁 Categorias criadas:', createdCategories.length)

  // Criar transações de exemplo
  const transactions = [
    {
      amount: 2500.00,
      description: 'Salário mensal',
      type: 'INCOME',
      date: new Date('2024-01-01'),
      categoryId: createdCategories.find(c => c.name === 'Salário')?.id!,
    },
    {
      amount: -45.50,
      description: 'Supermercado',
      type: 'EXPENSE',
      date: new Date('2024-01-02'),
      categoryId: createdCategories.find(c => c.name === 'Alimentação')?.id!,
    },
    {
      amount: -800.00,
      description: 'Renda do apartamento',
      type: 'EXPENSE',
      date: new Date('2024-01-03'),
      categoryId: createdCategories.find(c => c.name === 'Habitação')?.id!,
    },
    {
      amount: -25.00,
      description: 'Combustível',
      type: 'EXPENSE',
      date: new Date('2024-01-04'),
      categoryId: createdCategories.find(c => c.name === 'Transporte')?.id!,
    },
    {
      amount: -15.00,
      description: 'Cinema',
      type: 'EXPENSE',
      date: new Date('2024-01-05'),
      categoryId: createdCategories.find(c => c.name === 'Entretenimento')?.id!,
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: {
        ...transaction,
        userId: user.id,
      },
    })
  }

  console.log('💳 Transações criadas:', transactions.length)

  // Criar orçamentos
  const budgets = [
    {
      name: 'Orçamento Alimentação',
      amount: 300.00,
      spent: 45.50,
      categoryId: createdCategories.find(c => c.name === 'Alimentação')?.id!,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
    },
    {
      name: 'Orçamento Transporte',
      amount: 150.00,
      spent: 25.00,
      categoryId: createdCategories.find(c => c.name === 'Transporte')?.id!,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
    },
  ]

  for (const budget of budgets) {
    await prisma.budget.create({
      data: {
        ...budget,
        userId: user.id,
      },
    })
  }

  console.log('📊 Orçamentos criados:', budgets.length)

  // Criar metas financeiras
  const goals = [
    {
      title: 'Fundo de Emergência',
      description: 'Criar um fundo de emergência para 6 meses de despesas',
      targetAmount: 10000.00,
      currentAmount: 2500.00,
      targetDate: new Date('2024-12-31'),
    },
    {
      title: 'Viagem de Férias',
      description: 'Poupar para viagem de férias no verão',
      targetAmount: 3000.00,
      currentAmount: 500.00,
      targetDate: new Date('2024-07-01'),
    },
  ]

  for (const goal of goals) {
    await prisma.goal.create({
      data: {
        ...goal,
        userId: user.id,
      },
    })
  }

  console.log('🎯 Metas criadas:', goals.length)

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

