import React from 'react';

interface DataContextType {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
    const context = React.useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: React.ReactNode;
}

const DataProvider = ({ children }: DataProviderProps): React.ReactElement => {
    const [data, setData] = React.useState<any>(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;