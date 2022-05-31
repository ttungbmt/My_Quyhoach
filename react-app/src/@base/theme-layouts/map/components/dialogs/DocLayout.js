import {Button, DialogContent, DialogTitle} from "@mui/material";

function DocsLayout({heading, closeBtn}){
    return (
        <>
            <DialogTitle><span className="text-primary uppercase font-bold text-2xl">{heading}</span> {closeBtn}</DialogTitle>
            <DialogContent>
                <iframe width={560} height={315} src="https://www.youtube.com/embed/X1EpJbGrcY4" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <div className="flex justify-center mt-20"><Button variant="contained" color="primary">Tải về PDF hướng dẫn sử dụng</Button></div>
            </DialogContent>
        </>
    )
}

DocsLayout.defaultProps = {
  heading: 'Hướng dẫn sử dụng'
}

export default DocsLayout