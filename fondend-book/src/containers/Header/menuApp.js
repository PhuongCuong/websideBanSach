// export const adminMenu = [
//     { //hệ thống
//         name: 'menu.system.header', menus: [
//             {
//                 name: 'menu.system.system-administrator.header',
//                 subMenus: [
//                     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//                     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
//                     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
//                 ]
//             },
//             // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
//         ]
//     },
// ];

export const menuAdmin = [
    {
        name: 'menu.system.user-manage',
        menus: [
            {

                name: 'menu.system.user-manage', link: '/system/user-manage'

            }
        ]
    },
    {
        name: 'menu.system.product-manage',
        menus: [
            { name: 'menu.system.system-administrator.book-manage', link: '/system/book-manage' },
            { name: 'menu.system.system-administrator.detail-book-manage', link: '/system/detail-book-manage' },
            { name: 'menu.system.system-administrator.nhacungcap-manage', link: '/system/nhacungcap-manage' },
            { name: 'menu.system.system-administrator.nhaxuatban-manage', link: '/system/nhaxuatban-manage' },
            { name: 'menu.system.system-administrator.theloai-manage', link: '/system/theloai-manage' },
            { name: 'menu.system.system-administrator.discount-manage', link: '/system/discount-manage' },



        ]
    },
    {
        name: 'menu.system.bill-manage',
        menus: [
            { name: 'menu.system.system-administrator.bill-manage', link: '/system/bill-manage' }
        ]
    },
    {
        name: 'menu.system.statistical', link: '/system/statistical-manage'

    }
];

export const menustaff = [
    {
        name: 'menu.system.product-manage',
        menus: [
            { name: 'menu.system.system-administrator.book-manage', link: '/system/book-manage' },
            { name: 'menu.system.system-administrator.detail-book-manage', link: '/system/detail-book-manage' },
            { name: 'menu.system.system-administrator.nhacungcap-manage', link: '/system/nhacungcap-manage' },
            { name: 'menu.system.system-administrator.nhaxuatban-manage', link: '/system/nhaxuatban-manage' },
            { name: 'menu.system.system-administrator.theloai-manage', link: '/system/theloai-manage' },
            { name: 'menu.system.system-administrator.discount-manage', link: '/system/discount-manage' },



        ]
    },
    {
        name: 'menu.system.bill-manage',
        menus: [
            { name: 'menu.system.system-administrator.bill-manage', link: '/system/bill-manage' }
        ]
    },
];