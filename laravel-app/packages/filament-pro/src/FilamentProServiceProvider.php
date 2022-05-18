<?php
namespace FilamentPro;

use Filament\PluginServiceProvider;
use Spatie\LaravelPackageTools\Package;

class FilamentProServiceProvider extends PluginServiceProvider
{
    public static string $name = 'filament-pro';
//
//    protected array $widgets = [
//        \FilamentPro\Widgets\LatestUsers::class
//    ];
//
    public function configurePackage(Package $package): void
    {
        $package
            ->name(self::$name)
            ->hasViews();
    }

//    public function packageBooted(): void
//    {
//        parent::packageBooted();
//
//        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
//    }
//
//    protected function getStyles(): array
//    {
//        return [
//            self::$name . '-styles' => __DIR__ . '/../dist/css/app.css',
//        ];
//    }
//
//    protected function getScripts(): array
//    {
//        return [
//            self::$name . '-js' => __DIR__ . '/../dist/js/app.js',
//        ];
//    }
}
