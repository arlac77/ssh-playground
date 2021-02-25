import { readFileSync } from "fs";
import ssh2 from "ssh2";

const conn = new ssh2.Client();
conn
  .on("ready", () => {
  //  console.log("Client :: ready");
    conn.shell((err, stream) => {
      if (err) throw err;

      stream.on("close", () => conn.end());

      stream.pipe(process.stdout);
      
      /*
      stream
        .on("close", () => {
          conn.end();
        })
        .on("data", data => {
          console.log(""+data);
        });
        */
      stream.end("ls -l\nexit\n");
    });
  })
  .connect({
    host: "10.0.6.1",
    port: 22,
    username: "markus",
    agent: process.env.SSH_AUTH_SOCK,
    tryKeyboard: true
  });
