const folders = [
	{
		id: 5,
		name: 'Klasör 1',
		files: [
			{ id: 17, name: 'profil.jpg' },
			{ id: 18, name: 'manzara.jpg' },
		],
	},
	{
		id: 6,
		name: 'Klasör 2',
		files: [
			// { id: 17, name: 'profil.jpg' },
			{ id: 21, name: 'foto.png' },
			{ id: 22, name: 'dosya.xls' },
		],
	},
	{
		id: 7,
		name: 'Klasör 3',
	},
];

const move = (fileId, targetFolderID) => {
	const folder = folders.find((folder) =>
		folder.files.find((f) => f.id === fileId)
	);

	if (!folder) {
		throw new Error('File not found.');
	}

	//keep track of the old ID from where the file is moved  (line60 utilizes this id )
	const oldFolderId = folder.id;

	const fileToBeCopied = folder.files.find((f) => f.id === fileId);

	//since we're moving the file -> remove the file to be moved from the old folder (main difference between copying and moving)

	const folderToBeUpdated = folders.find(
		(folder) => folder.id === targetFolderID
	);

	if (!folderToBeUpdated) {
		throw new Error('Folder not found.');
	}

	//initialize empty files array if not present before copying.
	if (!folderToBeUpdated.files) {
		folderToBeUpdated.files = [];
	}

	const folderAfterCopy = {
		...folderToBeUpdated,
		files: [...folderToBeUpdated.files, fileToBeCopied],
	};

	const finalFolders = folders.map((folder) => {
		//handle move operation using the oldID
		if (folder.id === oldFolderId) {
			return {
				...folder,
				files: folder.files.filter((f) => f.id !== fileId),
			};
		}

		if (folder.id === targetFolderID) {
			return folderAfterCopy;
		} else {
			return folder;
		}
	});

	return finalFolders;
};

const copy = (fileId, targetFolderID) => {
	const folder = folders.find((folder) =>
		folder.files.find((f) => f.id === fileId)
	);

	if (!folder) {
		throw new Error('File not found.');
	}

	const fileToBeCopied = folder.files.find((f) => f.id === fileId);

	const folderToBeUpdated = folders.find(
		(folder) => folder.id === targetFolderID
	);

	if (!folderToBeUpdated) {
		throw new Error('Folder not found.');
	}

	//initialize empty files array if not present before copying.
	if (!folderToBeUpdated.files) {
		folderToBeUpdated.files = [];
	}

	const folderAfterCopy = {
		...folderToBeUpdated,
		files: [...folderToBeUpdated.files, fileToBeCopied],
	};

	const finalFolders = folders.map((folder) => {
		if (folder.id === targetFolderID) {
			return folderAfterCopy;
		} else {
			return folder;
		}
	});

	return finalFolders;
};

const remove = (fileId) => {
	const folder = folders.find((folder) =>
		folder.files.find((f) => f.id === fileId)
	);

	if (!folder) {
		throw new Error('File not found.');
	}

	const folderId = folder.id;

	const newFolders = folders.map((folder) => {
		if (folder.id === folderId) {
			return {
				...folder,
				files: folder.files.filter((f) => f.id !== fileId),
			};
		} else {
			return folder;
		}
	});

	return newFolders;
};

const removeFolder = (folderId) => {
	//sample input control - applicable to other functions as well.
	if (!(typeof folderId === 'number')) {
		throw new Error('Please provide a valid ID to remove the folder...');
	}

	const folderToBeRemoved = folders.find((f) => f.id === folderId);

	if (!folderToBeRemoved) {
		throw new Error('Folder not found.');
	}

	const newFolders = folders.filter((folder) => folder.id !== folderId);

	return newFolders;
};

const parentFolderOf = (fileId) => {
	const mapIds = folders.map(({ id }) => id);

	//map folderIds to fileIds
	const mapFiles = folders
		.map(({ files }, i) =>
			files ? { [mapIds[i]]: new Set(files.map((f) => f.id)) } : []
		)
		.flat();

	// there might be multiple parent folders...
	const res = [];
	mapFiles.forEach((o, i) => o[mapIds[i]].has(fileId) && res.push(mapIds[i]));

	return res.length < 1 ? 'File not found' : res;
};

//NOTE: None of the functions are mutating the original input. (Pure, deterministic functions)

// console.log(move(17, 6));
// console.log(copy(18, 7));
// console.log(remove(17));
// console.log(removeFolder(6));
// console.log(parentFolderOf(17));
