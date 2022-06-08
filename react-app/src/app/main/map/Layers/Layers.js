import PageSimple from '@base/theme-layouts/map/components/SidePage'
import {Alert, Checkbox, FormControlLabel} from '@mui/material'
import {useTitle} from '@base/hooks'
import {useTranslation} from 'react-i18next'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function Layers({title}) {
    const {t} = useTranslation()
    useTitle(t(title))

    const label = (name) => (<FormControlLabel label={name} control={<Checkbox/>}/>)

    return (
        <PageSimple
            title={t(title)}
            content={(
                <div className='p-12 w-full'>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}
                    >
                        <TreeItem nodeId="1" label="Ranh giới">
                            <TreeItem nodeId="3" label={label('Ranh giới Tỉnh TP')}/>
                            <TreeItem nodeId="4" label={label('Ranh giới Quận Huyện')}/>
                            <TreeItem nodeId="6" label={label('Ranh giới Phường Xã')}/>
                        </TreeItem>
                        <TreeItem nodeId="5" label="Địa chính">
                            <TreeItem nodeId="10" label={label('Quy hoạch 2014')}/>
                            <TreeItem nodeId="10" label={label('Quy hoạch 2020')}/>
                            <TreeItem nodeId="10" label={label('Quy hoạch 2022')}/>
                            <TreeItem nodeId="10" label={label('Quy hoạch giao thông')}/>
                            <TreeItem nodeId="11" label={label('Thửa đất')}/>
                        </TreeItem>
                    </TreeView>
                </div>
            )}
        />
    )
}

Layers.defaultProps = {
    title: 'Lớp dữ liệu'
}

export default Layers