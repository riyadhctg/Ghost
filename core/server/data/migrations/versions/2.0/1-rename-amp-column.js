const common = require('../../../../lib/common'),
    table = 'posts',
    columnNameOld = 'amp',
    columnNameNew = 'comment_id',
    message1 = `Renaming column ${columnNameOld} to ${columnNameNew}`,
    message2 = `Renaming column ${columnNameNew} to ${columnNameOld}`;

module.exports.up = function renameAmpColumn(options) {
    const connection = options.connection;

    common.logging.info(message1);

    return connection.schema.hasColumn(table, columnNameOld)
        .then((exists) => {
            if (exists) {
                return connection.schema.table(table, function (t) {
                    t.renameColumn(columnNameOld, columnNameNew);
                });
            }
        });
};

module.exports.down = function renameCommentIdColumn(options) {
    let connection = options.connection;

    common.logging.info(message2);

    return connection.schema.hasColumn(table, columnNameNew)
        .then((exists) => {
            if (exists) {
                return connection.schema.table(table, function (t) {
                    t.renameColumn(columnNameNew, columnNameOld);
                });
            }
        });
};
