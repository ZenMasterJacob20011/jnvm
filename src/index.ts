const command = process.argv[2];

switch (command) {
    case "install":
        console.log("install command called");
        break;
    case "list":
        console.log("list command called");
        break;
    case "use":
        console.log("use command called");
        break;
    default:
        console.log("command not found");
}

