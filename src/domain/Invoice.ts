interface Invoice {
    pdf_name: string;
    invoice_id: string;
    issue_date: string;
    issuer: {
        address: string;
        phone: string;
        tax_id: string;
    };
    items: {
        description: string;
        quantity: string;
        total: string;
        unit_price: string;
    }[];
    payment_method: string;
    recipient: {
        address: string;
        email: string;
        name: string;
        phone: string;
        tax_id: string;
    };
    subtotal: string;
    taxes: {
        amount: string;
        description: string;
        percentage: string;
    }[];
    total: string;
}