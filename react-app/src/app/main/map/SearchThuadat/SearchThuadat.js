import * as React from "react";
import ToadoTab from "./ToadoTab";
import SothuaTab from "./SothuaTab";
import DiachiTab from "./DiachiTab";
import {Tab, Tabs} from "@mui/material";
import useThuadatStore from "./useThuadatStore";
import SidePage from '@base/theme-layouts/map/components/SidePage'

function SearchThuadat(){
    const [tabIndex, setTabIndex] = useThuadatStore('tabIndex, setTabIndex')

    const handleChangeTab = (event, value) => setTabIndex(value);

    const tabs = [
        {label: 'Tọa độ', content: ToadoTab},
        {label: 'Số thửa đất', content: SothuaTab},
        {label: 'Địa chỉ', content: DiachiTab},
    ]

    return (
        <SidePage
            title="Tìm kiếm thửa đất"
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
                    <div>
                        {tabs.map(({content: Content}, k) => tabIndex === k && <Content key={k}/>)}
                    </div>
                </>
            )}
        />
    )
}

export default SearchThuadat