document.getElementById('jobForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const jobData = {
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      budget: document.getElementById('budget').value,
      location: document.getElementById('location').value,
      userId: document.getElementById('userId').value
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
  
      const data = await response.json();
      document.getElementById('statusMsg').textContent = data.message || 'Job posted!';
    } catch (error) {
      document.getElementById('statusMsg').textContent = 'Failed to post job.';
    }
  });

  document.getElementById('bidForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const bidData = {
      jobId: document.getElementById('jobId').value,
      workerId: document.getElementById('workerId').value,
      amount: document.getElementById('bidAmount').value
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/bids/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bidData)
      });
  
      const data = await response.json();
      document.getElementById('bidStatusMsg').textContent = data.message || 'Bid placed!';
    } catch (error) {
      document.getElementById('bidStatusMsg').textContent = 'Failed to place bid.';
    }
  });
  