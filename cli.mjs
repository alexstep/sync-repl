// import vm    from 'vm'
import repl  from 'repl'
import fetch from 'node-fetch'

let _eval
const replInstance = repl.start({ prompt : `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ : `,
	useColors       : true,
	ignoreUndefined : true,
	useGlobal       : true,

	async eval(cmd, context, filename, callback) {
		if (!cmd.trim()) { callback(null); return }

		const wrapped = `(async ()=>{ return ( ${cmd} ) })()`
		
		let result = null
		try {
			result = await _eval(wrapped);
			// result = await vm.runInThisContext(wrapped);
		} catch(err){
			result = await _eval(cmd);
		}

		callback(null, result)
	}
})
_eval = replInstance.context.eval

replInstance.context.a = 1
replInstance.context.test = (x=2) => { return 2*x }

replInstance.context.fetch = fetch
replInstance.context.getJson = function(url){
	return fetch(url).then(r=>{ return r.json() })
}