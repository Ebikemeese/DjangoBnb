
import { TbBeachOff } from "react-icons/tb"
import { GiVillage } from "react-icons/gi"
import { MdCabin } from "react-icons/md"
import { GiHut } from "react-icons/gi"
import { GiValley } from "react-icons/gi"

const category = () => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex flex-row items-center justify-between space-x-12">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
                <TbBeachOff/>
                <span className="text-xs">Beach</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
                <GiVillage/>
                <span className="text-xs">Villas</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
                <MdCabin/>
                <span className="text-xs">Cabins</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
                <GiHut/>
                <span className="text-xs">Huts</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
                <GiValley/>
                <span className="text-xs">Valleys</span>
            </div>
        </div>
    )
}

export default category;