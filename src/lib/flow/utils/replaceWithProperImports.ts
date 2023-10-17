import flowJson from "../../../../flow.json";
import { network } from "../config";

function replaceWithProperImports(cadence: String) {
  let broken = cadence.split(/\s/g);
  for (let i = 0; i < broken.length; i++) {
    if (broken[i] == "import" && broken[i + 2] == "from") {
      console.log('Contract Import Replace', broken[i + 1])
      let contractAddress = flowJson.contracts[broken[i + 1]].aliases[network];
      if (!contractAddress.startsWith('0x')) {
        contractAddress = '0x' + contractAddress;
      }
      cadence = cadence.replace(broken[i + 3], contractAddress)
    } else if (
      broken[i] == "transaction(" ||
      (broken[i] == "pub" && broken[i + 1] == "fun" && broken[i + 2] == "main")
    ) {
      break;
    }
  }
  return cadence;
}

export default replaceWithProperImports;