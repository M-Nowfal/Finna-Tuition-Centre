import dotenv from "dotenv"

dotenv.config();

const NUMBERS = [
  process.env.NUM_1,
  process.env.NUM_2,
  process.env.NUM_3,
  process.env.NUM_4,
  process.env.NUM_5,
  process.env.NUM_6,
  process.env.NUM_7,
  process.env.NUM_8,
  process.env.NUM_9,
  process.env.NUM_10,
];

const isValidStaffNumber = (number) => {
  for (let i = 0; i < NUMBERS.length; i++) {
    if (number == NUMBERS[i]) 
      return true;
  }
  return false;
};

export default isValidStaffNumber;
