import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Modal, Box, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "./ExtractViewer.css";

interface ExtractViewerProps {
    invoices: Invoice[];
}

const ExtractViewer: React.FC<ExtractViewerProps> = ({ invoices }) => {
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const handleOpen = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleClose = () => {
        setSelectedInvoice(null);
    };

    return (
        <div className='card-container'>
            {invoices.map((invoice) => (
                <Card
                    key={invoice.invoice_id}
                    variant="outlined"
                    className="invoice-card"
                    onClick={() => handleOpen(invoice)}
                >
                    <CardContent className="invoice-card-content">
                        <Typography variant="h6" component="div">
                            {invoice.pdf_name}
                        </Typography>
                        <PictureAsPdfIcon fontSize='large'></PictureAsPdfIcon>
                    </CardContent>
                </Card>
            ))}

            <Modal
                open={!!selectedInvoice}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="modal-box">
                    {selectedInvoice && <ViewInvoiceData invoice={selectedInvoice} />}
                </Box>
            </Modal>
        </div>
    );
};

const ViewInvoiceData: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
    return (
        <div>
            <Typography variant="h6" component="h2">
                Factura ID: {invoice.invoice_id}
            </Typography>
            <Typography variant="body1">
                <strong>Fecha de emisión:</strong> {invoice.issue_date}
            </Typography>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1"><strong>Emisor</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2"><strong>Dirección:</strong> {invoice.issuer.address}</Typography>
                    <Typography variant="body2"><strong>Teléfono:</strong> {invoice.issuer.phone}</Typography>
                    <Typography variant="body2"><strong>ID Fiscal:</strong> {invoice.issuer.tax_id}</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1"><strong>Destinatario</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2"><strong>Nombre:</strong> {invoice.recipient.name}</Typography>
                    <Typography variant="body2"><strong>Dirección:</strong> {invoice.recipient.address}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {invoice.recipient.email}</Typography>
                    <Typography variant="body2"><strong>Teléfono:</strong> {invoice.recipient.phone}</Typography>
                    <Typography variant="body2"><strong>ID Fiscal:</strong> {invoice.recipient.tax_id}</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1"><strong>Artículos</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {invoice.items.map((item, index) => (
                        <div key={index} className="accordion-item">
                            <Typography variant="body2"><strong>Descripción:</strong> {item.description}</Typography>
                            <Typography variant="body2"><strong>Cantidad:</strong> {item.quantity}</Typography>
                            <Typography variant="body2"><strong>Precio unitario:</strong> {item.unit_price}</Typography>
                            <Typography variant="body2"><strong>Total:</strong> {item.total}</Typography>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1"><strong>Impuestos</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {invoice.taxes.map((tax, index) => (
                        <div key={index} className="accordion-item">
                            <Typography variant="body2"><strong>Descripción:</strong> {tax.description}</Typography>
                            <Typography variant="body2"><strong>Porcentaje:</strong> {tax.percentage}</Typography>
                            <Typography variant="body2"><strong>Cantidad:</strong> {tax.amount}</Typography>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1"><strong>Resumen</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2"><strong>Subtotal:</strong> {invoice.subtotal}</Typography>
                    <Typography variant="body2"><strong>Método de pago:</strong> {invoice.payment_method}</Typography>
                    <Typography variant="body2"><strong>Total:</strong> {invoice.total}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ExtractViewer;
