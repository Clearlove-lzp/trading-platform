export const sellerMenu = [
	{
		path: "/admin/dashboard",
		name: "概览",
		Icon: "md-home"
	},
	{
		path: "/admin/accountManagement",
		name: "财务管理",
		Icon: "ios-paper",
	},
	{
		path: "/admin/productManagement",
		name: "商品管理",
		Icon: "ios-paper",
	},
	{
		path: "/admin/orderManagement",
		name: "订单管理",
		Icon: "ios-paper",
	},
]

export const adminMenu = [
	{
		path: "/admin/dashboard",
		name: "概览",
		Icon: "md-home"
	},
	{
		path: "/admin/businessManagement",
		name: "交易管理",
		Icon: "ios-paper",
	},
	{
		path: "/admin/modeManagement",
		name: "模型管理",
		Icon: "ios-paper",
	},
	{
		path: "/admin",
		name: "系统管理",
		Icon: "ios-paper",
		redirect: "/admin/userManagement",
		children: [
			{
				path: "userManagement",
				name: "用户管理"
			},
			{
				path: "roleManagement",
				name: "角色管理"
			},
			{
				path: "menuManagement",
				name: "菜单管理"
			}
		]
	}
]