import { useEffect, useState } from 'react'

export const useUtterances = (commentNodeId) => {
	useEffect(() => {
		const scriptParentNode = document.getElementById(commentNodeId)
		if (!scriptParentNode) return
		// docs - https://utteranc.es/
		const script = document.createElement('script')
		script.src = 'https://utteranc.es/client.js'
		script.async = true
		script.setAttribute('repo', 'lucasmaffazioli/zentexts_utteranc')
		script.setAttribute('issue-term', 'pathname')
		script.setAttribute('theme', 'photon-dark')
		script.setAttribute('crossorigin', 'anonymous')
		// script.setAttribute('label', 'comment :speech_balloon:')

		scriptParentNode.appendChild(script)

		return () => {
			// cleanup - remove the older script with previous theme
			scriptParentNode.removeChild(scriptParentNode.firstChild)
		}
	}, [commentNodeId])
}
