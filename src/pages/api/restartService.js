import { exec } from "shelljs";

export default async function handler(req, res) {
  try {
    const { method } = req;
    if (method === "GET") {
      res.status(200).send({ message: "GET request received" });
    } else if (method === "POST") {
      const projectDirectory = "D:\\Frontend\\brisma-fe";
      console.log("directory => ", projectDirectory);

      const { code, stderr, stdout } = exec(`npm run build`, {
        cwd: projectDirectory,
        env: process.env,
      });

      if (code !== 0) {
        console.error(`Error executing command 'npm run build': ${stderr}`);
        res.status(500).json({ error: "Failed to execute command" });
        return;
      }

      console.log("npm run build executed successfully");
      res.status(200).json({ message: "npm run build executed successfully" });
    }
  } catch (err) {
    res.status(500).send({ error: "Error :(" });
  }
}
