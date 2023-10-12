import flowJson from "../../../../flow.json";
import { network } from "../config";

const replaceWithProperImports = (cadence: string) => {
  return cadence
    .replace('"../contracts/utility/NonFungibleToken.cdc"', flowJson.contracts.NonFungibleToken.aliases[network])
    .replace('"../contracts/utility/FungibleToken.cdc"', flowJson.contracts.FungibleToken.aliases[network])
    .replace('"../contracts/utility/MetadataViews.cdc"', flowJson.contracts.MetadataViews.aliases[network])
    .replace('"../contracts/utility/FlowToken.cdc"', flowJson.contracts.FlowToken.aliases[network])
}

export default replaceWithProperImports;