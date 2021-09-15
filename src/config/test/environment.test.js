import fs from "fs";
import { EOL } from "os";
import { setupEnvironment } from "#src/config/environment.js";

describe("read environment file", () => {
  const env = "test";
  it("should read local environment if exists", () => {
    expect.hasAssertions();

    let exists = true;

    if (!fs.existsSync(`.env.${env}.local`)) {
      exists = false;
      fs.writeFileSync(`.env.${env}.local`, `NODE_ENV=test${EOL}`);
      fs.appendFileSync(`.env.${env}.local`, `DB_HOST=${EOL}`);
      fs.appendFileSync(`.env.${env}.local`, `DB_DATABASE=${EOL}`);
      fs.appendFileSync(`.env.${env}.local`, `DB_CLUSTER=${EOL}`);
      fs.appendFileSync(`.env.${env}.local`, `DB_USERNAME=${EOL}`);
      fs.appendFileSync(`.env.${env}.local`, `DB_PASSWORD=${EOL}`);
    }

    setupEnvironment(env);
    expect(fs.existsSync(`.env.${env}.local`)).toBeTruthy();
    if (!exists) {
      fs.rmSync(`.env.${env}.local`);
    }
  });

  it("should read default environment", () => {
    expect.hasAssertions();

    let exists = false;

    if (fs.existsSync(`.env.${env}.local`)) {
      exists = true;
      fs.copyFileSync(`.env.${env}.local`, `.env.${env}.local.bak`);
      fs.rmSync(`.env.${env}.local`);
    }

    setupEnvironment(env);
    expect(fs.existsSync(`.env.${env}.local`)).toBeFalsy();

    if (exists) {
      fs.copyFileSync(`.env.${env}.local.bak`, `.env.${env}.local`);
      fs.rmSync(`.env.${env}.local.bak`);
    }
  });

  it("should read production environment", () => {
    setupEnvironment("production");
    expect(fs.existsSync(`.env`)).toBeTruthy();
  });

  it("should read development environment", () => {
    setupEnvironment("development");
    expect(fs.existsSync(`.env`)).toBeTruthy();
  });
});
