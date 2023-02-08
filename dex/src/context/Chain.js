import { ChainId } from "@thirdweb-dev/sdk"
import { createContext } from "react"

const mainChainId = ChainId.BinanceSmartChainMainnet

const ChainContext = createContext(mainChainId)

export default ChainContext