
export default{
	getTitle(obj) {
		let text = ''
		switch (obj) {
			case 'Login':
				text = '登录'
				break
			case 'First':
				text = '成长'
				break
				default:
		}
		return text
	}

}
