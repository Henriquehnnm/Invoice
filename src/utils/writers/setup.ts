import { readUserForInit, genericConfirm } from "../../cli/readUser";
import { homedir } from "os";

// TODO - Verificar se o arquivo ja existe, se sim, perguntar se quer reescrever
export const setup = async (): Promise<boolean> => {
  const configPath = `${homedir()}/.invoicerc`;
  const file = Bun.file(configPath);

  if (await file.exists()) {
    const data = await genericConfirm(
      "There is already a configuration file, rewrite it?",
      false,
    );
    if (!data) {
      return false;
    }
  }

  const data = await readUserForInit();
  try {
    await Bun.write(configPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    return false;
  }
};
