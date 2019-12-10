var advertiser = {
    id: '',
    status: req.body.status,
    create_by: req.body.create_by,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    mobile_no: req.body.mobile_no,
    password: req.body.password,
    user_type: req.body.user_type,
    user_role_id: req.body.user_role_id,
    user_group: '',
    user_id: '',
    user_group_id: '',
    secret_key: '',
};
if (advertiser.user_type == 1) {
    advertiser.user_group = 'advertiser'
} else {
    advertiser.user_group = 'publisher'
}