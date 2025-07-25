export interface Transaction {
  date: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export function parseCSV(csvContent: string): Transaction[] {
  const lines = csvContent.trim().split('\n');
  const [header, ...dataLines] = lines;
  
  // Parse header to get column indices
  const headers = header.split(',').map(h => h.trim());
  const dateIndex = headers.indexOf('date');
  const titleIndex = headers.indexOf('title');
  const amountIndex = headers.indexOf('amount');
  const typeIndex = headers.indexOf('type');
  const categoryIndex = headers.indexOf('category');
  
  if (dateIndex === -1 || titleIndex === -1 || amountIndex === -1 || typeIndex === -1 || categoryIndex === -1) {
    throw new Error('Required columns not found in CSV header');
  }
  
  const transactions: Transaction[] = [];
  
  for (const line of dataLines) {
    if (!line.trim()) continue;
    
    const columns = parseCSVLine(line);
    
    if (columns.length <= Math.max(dateIndex, titleIndex, amountIndex, typeIndex, categoryIndex)) {
      console.warn(`Skipping malformed line: ${line}`);
      continue;
    }
    
    const date = columns[dateIndex].trim();
    const title = columns[titleIndex].trim();
    const amount = parseFloat(columns[amountIndex].trim());
    const type = columns[typeIndex].trim() as 'income' | 'expense';
    const category = columns[categoryIndex].trim();
    
    if (isNaN(amount) || (type !== 'income' && type !== 'expense')) {
      console.warn(`Skipping invalid transaction: ${line}`);
      continue;
    }
    
    transactions.push({
      date,
      title,
      amount,
      type,
      category
    });
  }
  
  return transactions;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }
  
  // Add the last field
  result.push(current);
  
  return result;
}