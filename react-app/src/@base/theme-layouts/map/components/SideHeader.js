import {styled} from "@mui/material/styles";
import {env} from '@base/utils'
import IconButton from "@mui/material/IconButton";
import history from '@history';
import {memo} from "react";
import {useLocation} from "react-router-dom";
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Typography from "@mui/material/Typography";
// import NavbarToggleButton from "app/fuse-layouts/shared-components/NavbarToggleButton";

const Root = styled('div')(({ theme, config }) => ({
  minHeight: 75,
  background: 'url(/images/backgrounds/map_1.png) no-repeat 150px 0 #ffffff',

  '& .site-logo-wrapper': {
    padding: '10px 10px 10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

}));

function SideHeader({back, title}){
  const location = useLocation()

  // let isHomepage = location.pathname === env('HOMEPAGE'),
  //   siteName = env('NAME'),
  //   siteTitle = title ?? siteName,
  //   siteDesc = env('DESC')
  //
  // if(isHomepage) {
  //   siteName = title
  //   siteTitle = env('NAME')
  // }

  return (
    <Root>
      <div className="site-logo-wrapper">
        <img className="site-logo" src="https://tongdaidiaoc.com.vn/_nuxt/img/logo_tddo_dark.60c70e4.png" alt="" style={{height: 70}}/>
        <NavbarToggleButton className="w-40 h-40 p-0">
          <FuseSvgIcon size={20} color="action">material-twotone:menu_open</FuseSvgIcon>
        </NavbarToggleButton>
      </div>
      <div className="border-t px-[10px] py-8">
        <Typography className="font-semibold uppercase text-primary text-[16px]" component="span"> > {title}</Typography>
      </div>


      {/*<div>
        <div className="site-nagigation">
          {back && <IconButton size="medium" onClick={() => history.goBack()}><i className="fal fa-long-arrow-left text-[15px]" /></IconButton>}
        </div>
        <div className="flex flex-col gap-10">
          <img className="site-logo" src={env('LOGO')} alt="Logo"/>
          <div className="flex flex-col uppercase gap-2">
            <div className="site-name text-primary text-2xl font-semibold">{siteTitle}</div>
            <div className="site-title flex text-[11px] font-semibold gap-4 text-blue">
              {siteDesc && isHomepage && (<span>> {env('DESC')}</span>)}
              {siteName && (<span>> {siteName}</span>)}
            </div>
          </div>
        </div>
      </div>*/}

    </Root>
  )
}

export default memo(SideHeader)
