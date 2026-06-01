import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Button from '@/components/ui/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  comingSoon?: boolean;
  buttonText: string;
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'For individuals getting started',
      features: [
        { name: 'Limited tests - 1 subject per exam', included: true },
        { name: 'Study recommendation', included: true },
        { name: 'Ads (in app side)', included: true },
      ],
      buttonText: 'Get started for free',
    },
    {
      id: 'student-pro',
      name: 'Student Pro plan',
      price: '₦1,000',
      period: '/per month',
      description: 'Most popular plan',
      features: [
        { name: 'Unlimited practice', included: true },
        { name: 'Study recommendation', included: true },
        { name: 'Performance analytics', included: true },
        { name: 'All Exams Body', included: true },
      ],
      isPopular: true,
      buttonText: 'Get started',
    },
    {
      id: 'school-plan',
      name: 'School plan',
      price: 'Coming Soon',
      period: '',
      description: 'For Schools',
      features: [
        { name: 'Bulk Seats (100 - 500 students)', included: true },
        { name: 'Teacher dashboard', included: true },
        { name: 'All features in Student Pro', included: true },
        { name: 'Performance Tracking', included: true },
      ],
      comingSoon: true,
      buttonText: 'Upgrade to teams plan',
    },
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'starter') {
      navigate({ to: '/dashboard' });
    } else if (planId === 'student-pro') {
      navigate({ to: '/dashboard' });
      // Here you could integrate with payment gateway
    } else if (planId === 'school-plan') {
      // Coming soon
      return;
    }
  };

  return (
    <div className='min-h-screen w-full bg-black text-white py-20 px-4 md:px-8'>
      {/* Header */}
      <div className='text-center mb-16'>
        <div className='flex justify-center my-8 w-full'>
             <Button
                variant={'secondary'}
                className={`p-4 text-white inline-block`}
              >
                Pricing
              </Button>
        </div>
        <h1 className='text-5xl font-semibold mb-4'>Choose The Perfect Plan</h1>
      </div>

      {/* Pricing Cards Container */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end'>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className='relative'
            onMouseEnter={() => setHoveredCard(plan.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 z-10'>
                <div className='bg-[#0055FF] px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap'>
                  MOST POPULAR PLAN
                </div>
              </div>
            )}

            {/* Card */}
            <div
              className={`p-8  h-full flex flex-col rounded-2xl border transition-all duration-300 ${
                hoveredCard === plan.id
                  ? 'border-2 border-[#0055FF] bg-[#0a0a1a] scale-105'
                  : 'border border-gray-700 rounded-xl'
              }`}
            >
              <div className='flex-grow'>
                {/* Plan Name and Price */}
                <div className='mb-6'>
                  <h3 className='text-xl font-bold mb-2'>{plan.name}</h3>
                  <div className='flex items-baseline gap-2 mb-2'>
                    <span className='text-4xl md:text-5xl font-bold'>{plan.price}</span>
                    <span className='text-gray-400'>{plan.period}</span>
                  </div>
                  <p className='text-sm text-gray-400'>{plan.description}</p>
                </div>

                {/* Features List */}
                <div className='space-y-4 mb-8'>
                  {plan.features.map((feature, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <CheckCircleIcon
                        className='text-[#0055FF] flex-shrink-0 mt-1'
                        fontSize='small'
                      />
                      <span className='text-sm md:text-base text-gray-300'>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.isPopular ? 'primary' : 'secondary'}
                onClick={() => handlePlanSelect(plan.id)}
                disabled={plan.comingSoon}
                className={`w-full ${plan.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
