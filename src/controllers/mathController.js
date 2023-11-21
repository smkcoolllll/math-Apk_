const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mathController = {
  addition: async (req, res) => {
    try {
      const { num1, num2 } = req.body;
      const result = num1 + num2;
      await prisma.mathOperation.create({
        data: {
          operation: 'addition',
          input1: num1,
          input2: num2,
          result,
        },
      });
      res.json({ result });
    } catch (error) {
      console.error('Error in addition API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  factorial: async (req, res) => {
    try {
      const { number } = req.params;
      const num = parseInt(number);
      if (isNaN(num) || num < 0) {
        return res.status(400).json({ error: 'Invalid input for factorial' });
      }

      const result = calculateFactorial(num);
      await prisma.mathOperation.create({
        data: {
          operation: 'factorial',
          input1: num,
          result,
        },
      });
      res.json({ result });
    } catch (error) {
      console.error('Error in factorial API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  fibonacci: async (req, res) => {
    try {
      const { count } = req.params;
      const numCount = parseInt(count);
      if (isNaN(numCount) || numCount < 0) {
        return res.status(400).json({ error: 'Invalid input for Fibonacci' });
      }

      const result = calculateFibonacci(numCount);
      await prisma.mathOperation.create({
        data: {
          operation: 'fibonacci',
          input1: numCount,
          result: result.join(', '),
        },
      });
      res.json({ result });
    } catch (error) {
      console.error('Error in fibonacci API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

function calculateFactorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return num * calculateFactorial(num - 1);
}

function calculateFibonacci(count) {
  const result = [0, 1];
  for (let i = 2; i < count; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
}

module.exports = mathController;
