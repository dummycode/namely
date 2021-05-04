/**
 * User errors
 */
exports.UserNotFoundError = class UserNotFoundError extends Error {};
exports.UserAlreadyExistsError = class UserAlreadyExistsError extends Error {};
exports.InvalidPasswordError = class InvalidPasswordError extends Error {};

/**
 * Group errors
 */
exports.GroupNotFoundError = class GroupNotFoundError extends Error {};
exports.GroupMembershipNotFoundError = class GroupMembershipNotFoundError extends Error {};
exports.GroupMembershipAlreadyExistsError = class GroupMembershipAlreadyExistsError extends Error {};

/**
 * Friend request errors
 */
exports.FriendRequestNotFoundError = class FriendRequestNotFoundError extends Error {};
exports.FriendRequestAlreadyExistsError = class FriendRequestAlreadyExistsError extends Error {};

/**
 * Name errors
 */
exports.NameNotFoundError = class NameNotFoundError extends Error {};

/**
 * Validation errors
 */
exports.ValidationFailedError = class ValidationFailedError extends Error {
    constructor(errors = [], ...params) {
        super(...params);
        this.errors = errors;
    }
};

/**
 * Encryption errors
 */
exports.EncryptionFailedError = class EncryptionFailedError extends Error {};

/**
 * Database errors
 */
exports.ErrorConnectingToDatabaseError = class ErrorConnectingToDatabaseError extends Error {};
