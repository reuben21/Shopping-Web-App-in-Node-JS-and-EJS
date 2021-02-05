const deleteProduct = (btn) => {
    const product_id = btn.parentNode.querySelector('[name=productId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    console.log('clicked',product_id,'\n',csrfToken);
};

