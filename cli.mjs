import repl from 'repl'
// import vm   from 'vm'

const replInstance = repl.start({ 
	prompt          : `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ : ` ,
	useColors       : true ,
	ignoreUndefined : true ,
	useGlobal       : true ,

	async eval(cmd, context, filename, callback) {
		if (!cmd.trim()) { callback(null); return }

		const wrapped = `(async ()=>{ return ( ${cmd} ) })()`
		
		let result = null
		try {
			result = await _eval(wrapped)
			// result = await vm.runInThisContext(wrapped)
		} catch(err){
			result = await _eval(cmd)
		}

		callback(null, result)
	}
})
let _eval = replInstance.context.eval



import fetch from 'node-fetch'

replInstance.context.fetch = fetch
replInstance.context.getJson = url => {
	return fetch(url).then( r => { return r.json() })
}
replInstance.context.a = 1
replInstance.context.test = (x=2) => { return 2*x }