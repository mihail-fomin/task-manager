export default function formatDate(originalDateString: string): string {
  const date = new Date(originalDateString)
  // Получение дня, месяца и года из исходной даты
  const day = date.getDate()
  const month = date.getMonth() + 1 // Месяцы в JavaScript начинаются с 0
  const year = date.getFullYear()

  return `${day}/${month < 10 ? 0 + String(month) : month}/${year}`
}
