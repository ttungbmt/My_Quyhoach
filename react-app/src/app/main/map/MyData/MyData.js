import {Tab, Tabs} from "@mui/material";
import SidePage from '@base/theme-layouts/map/components/SidePage'
import {useState} from "react";

function SearchThuadat(){
    const [tabIndex, setTabIndex] = useState(0)

    const handleChangeTab = (event, value) => setTabIndex(value);

    const tabs = [
        {label: 'Dữ liệu'},
        {label: 'Yêu thích'},
    ]

    return (
        <SidePage
            title="Dữ liệu của tôi"
            content={(
                <>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChangeTab}
                        variant="fullWidth"
                        className="border-b"
                    >
                        {tabs.map(({label}, k) => <Tab key={k} className="text-14 min-w-64 mx-4 px-12" label={label}/>)}
                    </Tabs>
                </>
            )}
        />
    )
}

export default SearchThuadat