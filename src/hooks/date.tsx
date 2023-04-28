import {ReactNode, createContext, useContext} from 'react'

interface DateContextData {
    modifiedDate: string
}

interface DateProviderProps {
    children: ReactNode
}

const DateContext = createContext<DateContextData>(
    {} as DateContextData
)

export default function DateProvider(props: DateProviderProps) {
    const date = new Date()

    const today = date.getDate()
    const modifiedTodayDate = today <= 9 ? `0${today}` : `${today}`

    const month = date.getMonth() + 1
    const modifiedMonthDate = month <= 9 ? `0${month}` : `${month}`
    
    const modifiedDate = modifiedTodayDate + '/' + modifiedMonthDate

    return (
        <DateContext.Provider value={{
            modifiedDate
        }}>
            {props.children}
        </DateContext.Provider>
    )
}

export function useDate() {
    const context = useContext(DateContext)
    return context
}