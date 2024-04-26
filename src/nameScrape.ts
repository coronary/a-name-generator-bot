	const rewriter = new HTMLRewriter()

	const fileText = await Bun.file('src/assets/omni.html').text()

	rewriter.on('a.baby-name-link', {
		text: (te) => {
			te.text && console.log(`"${ te.text }",`) 
		}
	})

	rewriter.transform(fileText)
