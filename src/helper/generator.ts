export default function generateId(prefix: string) {
  const timestamp = Date.now().toString(16); // Convert timestamp to hexadecimal
  const randomPart = Math.random().toString(16).substr(2); // Generate a random hexadecimal string
  return `${randomPart}-${timestamp}`;
}
