
exports.copyFields = function(src, dest) {
  if (!dest) {
    dest = {};
  }

  for (var field in src) {
    dest[field] = src[field];
  }

  return dest;
};