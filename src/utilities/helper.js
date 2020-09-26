const getScreenOptions = (TransitionPresets) => {
	return({
		gestureEnabled: true,
		cardOverlayEnabled: true,
		...TransitionPresets.DefaultTransition
	})
};

export {
	getScreenOptions
}