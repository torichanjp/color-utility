import React, {useContext, useState} from "react";

export type ParamsType = {
    hueDivisions: number,
    setHueDivisions: Function,
    useLuma: boolean,
    setUseLuma: Function,
}

const defaultValues = {
    hueDivisions: 10,
    setHueDivisions: () => {
        console.warn('ParamsContext uses default value')
    },
    useLuma: true,
    setUseLuma: () => {
        console.warn('ParamsContext uses default value')
    },
}

const Params = React.createContext<ParamsType>(defaultValues)
export const useParams = () => useContext(Params)

export const ParamsContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [hueDivisions, setHueDivisions] = useState(10)
    const [useLuma, setUseLuma] = useState(true)

    const values = {
        hueDivisions,
        useLuma,
        setHueDivisions,
        setUseLuma,
    }

    return (
        <Params.Provider value={values}>
            {children}
        </Params.Provider>
    )
}
