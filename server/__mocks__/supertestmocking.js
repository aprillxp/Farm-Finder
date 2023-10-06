const request = jest.fn(() => Promise.resolve({ 
    // Objek respon yang Anda inginkan untuk pengujian
    status: 200,
    body: { message: 'Mocked response' }
  }));

  module.exports = request