const { rmdir } = require('fs');
rmdir('./dist', { recursive: true }, (err) => {
  if (err == null) {
    console.log('Last build deleted successfully');
  } else if (err.code !== 'ENOENT') {
    console.error('Failure to delete last build');
    console.error(err);
    process.exit(500);
  }
});
