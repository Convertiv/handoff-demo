import Handoff from "handoff-app";

// To use the hook, uncomment this
(async function () {
  try {
    console.log(
      `Running Handoff fetch and build`
    );
    const handoff = new Handoff({
      title: "Handoff Bootstrap",
      integration: {
        name: "bootstrap",
        version: "5.3",
      },
    });

    handoff.configureExportables((exportables) => {
      exportables.push("components/badge");
      return exportables;
    });
    await handoff.fetch();
    await handoff.start();
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
})();
