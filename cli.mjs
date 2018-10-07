import repl from 'repl'

const replInstance = repl.start({ 
	prompt          : `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧  ` ,
	useColors       : true ,
	ignoreUndefined : true ,
	useGlobal       : true ,

	async eval(cmd, context, filename, callback) {
		if (!cmd.trim()) { callback(null); return }

		const wrapped = `(async ()=>{ return ( ${cmd} ) })()`
		
		let result = null
		try {
			result = await context.eval(wrapped)
		} catch(err){
			result = await context.eval(cmd)
		}

		callback(null, result)
	}
})


/*
 * Test random functions
 */
import fetch from 'node-fetch'
const ctx   = replInstance.context
ctx.fetch   = fetch
ctx.getJson = url => { return fetch(url).then( r => { return r.json() }) }
ctx.sleep   = sec => { return new Promise(r => { setTimeout(r, sec*1000) }) }
ctx.test    = arg => { return 2*(arg||2) }
ctx.somevar = 1
