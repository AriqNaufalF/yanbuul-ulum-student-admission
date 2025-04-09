# Yanbu'ul Ulum Student Admission Website

The Yanbu'ul Ulum Student Admission Website is an online portal designed to facilitate student enrollment at Yanbu'ul Ulum.

## Prerequisites

- [PHP](https://www.php.net/downloads.php) 8.4.x or higher
- [Nodejs](https://nodejs.org/en/download) 22.x or higher
- [Mysql](https://www.mysql.com/downloads/) 8.0.x
- [Composer](https://getcomposer.org/download/) 2.x or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/AriqNaufalF/yanbuul-ulum-student-admission.git

# Go into repository
cd yanbuul-ulum-student-admission

# Install require package
composer install && npm install

# Copy .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migration
php artisan migrate

# Start the server
composer run dev
```

## References

- [Laravel](https://laravel.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwindcss](https://tailwindcss.com/docs)
- [Inertia.js](https://inertiajs.com/)
