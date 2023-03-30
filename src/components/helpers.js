import sha256 from 'crypto-js/sha256';

function getHourlyPseudoRandomIdx(length) {
  // Get the current hour, day, month, and year
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDate();
  const month = now.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed values
  const year = now.getFullYear();

  // Combine the hour, day, month, and year into a string
  const inputString = `${hour}-${day}-${month}-${year}`;

  // Hash the input string using SHA-256
  const hash = sha256(inputString);
  
  // Convert the hash to an integer 
  const hexString = hash.toString();
  const hashInt = parseInt(hexString.slice(0, 8), 16);

  // Get a random index using the hash and the length
  const randomIndex = hashInt % length;

  return randomIndex;
}

export default getHourlyPseudoRandomIdx;