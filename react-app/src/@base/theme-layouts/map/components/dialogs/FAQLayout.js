import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    DialogContent,
    DialogTitle, LinearProgress, Typography
} from '@mui/material'
import { styled } from '@mui/material/styles';
import DocsLayout from '@base/theme-layouts/map/components/dialogs/DocLayout'
import { useQuery } from 'react-query'
import axios from 'axios'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    margin: 0,
    border: 'none!important',
    borderRadius: '8px!important',
    marginBottom: 24,
    '&:before': {
        display: 'none',
    },
    '&:first-of-type': {},
    '&:last-of-type': {
        marginBottom: 0,
    },
}));

function FAQLayout({heading, closeBtn}){
    const { isLoading, data } = useQuery('faqData', () => axios.get('/api/faqs').then(res => res.data))


    return (
        <>
            <DialogTitle sx={{pr: 6}}>
                <span className="text-primary uppercase font-bold text-2xl">{heading}</span> {closeBtn}
            </DialogTitle>
            <DialogContent className="md:min-w-[600px]" sx={{backgroundColor: 'background.default', pt: '16px!important'}}>
                {isLoading && <LinearProgress/>}
                {_.isArray(data) && data?.map(({title, content}, k) => (
                    <StyledAccordion key={k}>
                        <AccordionSummary>
                            <div className="flex py-4">
                                <i className="fa-light fa-circle-question text-[20px]"></i>
                                <Typography className="px-12 font-medium">{k+1}. {title}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="pt-0 px-32 leading-6" dangerouslySetInnerHTML={{__html: content}}>
                        </AccordionDetails>
                    </StyledAccordion>
                ))}
            </DialogContent>
        </>
    )
}

FAQLayout.defaultProps = {
    heading: 'Câu hỏi thường gặp'
}


export default FAQLayout