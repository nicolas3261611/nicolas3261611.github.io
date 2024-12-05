import axios from "axios";

export default async function handler(req, res) {
  // Validación del método HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validación y parseo de la entrada
  const { code, language, versionIndex } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  // Configuración de la API de JDoodle
  const JDoodleConfig = {
    clientId: process.env.JDOODLE_CLIENT_ID, // Usa variables de entorno
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    baseUrl: "https://api.jdoodle.com/v1/execute",
  };

  try {
    // Llamada a la API de JDoodle
    const response = await axios.post(JDoodleConfig.baseUrl, {
      script: code,
      language: language,
      versionIndex: versionIndex || "0",
      clientId: JDoodleConfig.clientId,
      clientSecret: JDoodleConfig.clientSecret,
    });

    // Respuesta exitosa
    return res.status(200).json({
      output: response.data.output,
      memory: response.data.memory,
      cpuTime: response.data.cpuTime,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to execute code",
      details: error.response?.data || error.message,
    });
  }
}