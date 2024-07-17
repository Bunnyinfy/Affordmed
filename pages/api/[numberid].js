
let windowNumbers = [];
const windowSize = 10;

const fetchNumbers = async (id) => {

  const response = await fetch(`http://localhost:4000/numbers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch numbers');
  }
  const data = await response.json();
  return data.numbers;
};

export default async (req, res) => {
  const { numberid } = req.query;


  const validIds = ['p', 'f', 'e', 'r'];
  if (!validIds.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    
    const newNumbers = await fetchNumbers(numberid);

    
    const uniqueNumbers = [...new Set([...windowNumbers, ...newNumbers])];

    
    if (uniqueNumbers.length > windowSize) {
      uniqueNumbers.splice(0, uniqueNumbers.length - windowSize);
    }

  
    const prevState = [...windowNumbers];
    windowNumbers = uniqueNumbers;

    
    const average = windowNumbers.reduce((a, b) => a + b, 0) / windowNumbers.length;

    
    const response = {
      windowPrevState: prevState,
      windowCurrState: windowNumbers,
      avg: average,
    };

    
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch numbers' });
  }
};
