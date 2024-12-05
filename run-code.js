const axios = require("axios");

exports.handler = async function (event) {
  const { code, language, versionIndex } = JSON.parse(event.body);

  if (!code || !language) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Code and language are required" }),
    };
  }

  try {
    const JDoodleConfig = {
      clientId: b35a6bc22535adfda5f6b1803c2d1e37,
      clientSecret: e1c1d98d4371e750287bacb6655237a227c22c9ef3b6fc893957a3d4d817ae7e,
      baseUrl: "https://api.jdoodle.com/v1/execute",
    };

    const response = await axios.post(JDoodleConfig.baseUrl, {
      script: code,
      language: language,
      versionIndex: versionIndex || "0",
      clientId: JDoodleConfig.clientId,
      clientSecret: JDoodleConfig.clientSecret,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        output: response.data.output,
        memory: response.data.memory,
        cpuTime: response.data.cpuTime,
      }),
    };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to execute code" }),
    };
  }
};
